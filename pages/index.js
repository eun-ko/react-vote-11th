import React from 'react';
import styled from 'styled-components';

import LoginForm from '../src/components/login-form';

export default function Home() {
	return (
		<Wrapper>
			<Title>리액트 투-표</Title>
			<LoginForm />
		</Wrapper>
	);
}
const Title = styled.h1`
	font-size: 40px;
`;
const Wrapper = styled.div`
	min-height: 100vh;
	padding: 10rem 40rem;
	background-color: Azure;
`;
