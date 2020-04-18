import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

function VoteForm() {
	const [candidates, setCandidates] = useState([]);
	const [voteCount, setVoteCount] = useState();

	useEffect(() => {
		getCandidates();
	}, []);

	const getCandidates = async () => {
		await axios
			.get(process.env.API_HOST + '/candidates/', candidates)
			.then(({ data }) => {
				setCandidates(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const voteCandidates = async (candidate) => {
		const newUrl = `${process.env.API_HOST}/candidates/${candidate._id}/vote/`;
		await axios
			.put(newUrl, voteCount)
			.then(({ data }) => {
				setVoteCount(data);
				alert(candidate.name + '님에게 투표 완료!');
				getCandidates();
			})
			.catch(function (error) {
				console.log(error);
				alert('투표 실패!');
			});
	};

	return (
		<Wrapper>
			<Title>
				<RedTitle>프론트엔드 인기쟁이</RedTitle>는 누구?
			</Title>
			<SubTitle>CEOS 프론트엔드 개발자 인기 순위 및 투표 창입니다.</SubTitle>
			<VoteArea>
				{candidates
					.sort((person1, person2) => person2.voteCount - person1.voteCount)
					.map((person, index) => (
						<Row key={person._id}>
							<Rank>{index + 1}위:</Rank>
							<CandiName>
								{person.name}
								<br />[{person.voteCount}표]
							</CandiName>
							<Button onClick={() => voteCandidates(person)}>투표</Button>
						</Row>
					))}
			</VoteArea>
		</Wrapper>
	);
}
export default React.memo(VoteForm);
const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const Button = styled.button`
	background-color: navy;
	color: white;
	font-size: 1.5rem;
	padding: 0.5rem 1rem;
	border-style: none;
	border-radius: 1rem;
`;
const Rank = styled.strong`
	font-size: 1.5rem;
	margin: 0rem 4rem 1rem 0rem;
`;
const CandiName = styled.p`
	font-size: 1.5rem;
	display: block;
	margin: 0rem auto 1rem 0rem;
`;
const VoteArea = styled.div`
	width: 100%;
	padding: 5rem 10rem;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const Title = styled.span`
	font-size: 3rem;
	color: black;
	display: inline-block;
	font-weight: bold;
`;
const RedTitle = styled.span`
	font-size: 3rem;
	color: crimson;
`;
const SubTitle = styled.h1`
	font-size: 2.5rem;
	color: grey;
`;

const Wrapper = styled.div`
	width: 100%;
	min-height: 30rem;
	background-color: white;
	font-size: 18px;
	padding: 3rem 4rem 10rem;
`;
