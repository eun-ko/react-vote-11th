import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import VoteForm from './vote-form';

export default function LoginForm() {
	const [logForm, setLogForm] = useState({ email: '', password: '' });
	const [isloged, setloged] = useState(false);

	const erasePW = () => {
		document.getElementById('password').value = '';
	};

	const eraseEmail = () => {
		document.getElementById('email').value = '';
	};

	const handleFormChange = (e) => {
		setLogForm({ ...logForm, [e.target.id]: e.target.value });
	};

	const handleSubmit = (logForm) => {
		const { email, password } = logForm;
		if (email === '' || password === '') {
			alert('모든 항목을 입력해주세요!');
			return false;
		} else {
			axios
				.post(process.env.API_HOST + '/auth/signin/', logForm)
				.then(function (response) {
					console.log(response);
					setloged(true);
					alert('로그인 성공!');
				})
				.catch(function (error) {
					if (error.response.status === 404) {
						console.log('unauthorized, logging out ...');
						alert('이메일이 존재하지 않습니다.');
						eraseEmail();
						erasePW();
					} else if (error.response.status === 422) {
						alert('비밀번호가 일치하지 않습니다!');
						erasePW();
					}
					return Promise.reject(error.response);
				});
		}
	};

	return (
		<div>
			{!isloged && (
				<Wrapper>
					<Title>로그인</Title>
					<Row>
						<Label>EMAIL</Label>
						<Input type="text" id="email" onChange={handleFormChange}></Input>
					</Row>
					<Row>
						<Label>PASSWORD</Label>
						<Input
							type="password"
							onChange={handleFormChange}
							id="password"
						></Input>
					</Row>
					<Button onClick={() => handleSubmit(logForm)}>로그인</Button>
				</Wrapper>
			)}

			{isloged && <VoteForm />}
		</div>
	);
}
const Title = styled.h1`
	font-size: 3rem;
	margin-bottom: 4rem;
	margin-top: 25px;
`;
const Row = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 2rem;
`;
const Button = styled.button`
	display: block;
	margin-left: auto;
	font-size: 1.8rem;
	padding: 0.5rem 1rem;
	border-style: none;
	border-radius: 1rem;
`;

const Label = styled.label`
	font-size: 20px;
	margin-right: auto;
`;
const Input = styled.input`
	width: 75%;
	padding: 0.5rem 1rem;
	border: 1px solid grey;
`;
const Wrapper = styled.div`
	width: 100%;
	min-height: 30rem;
	background-color: white;
	font-size: 18px;
	padding: 3rem 4rem;
`;
