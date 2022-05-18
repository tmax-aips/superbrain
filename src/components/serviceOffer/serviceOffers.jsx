import React from 'react';
import styled from 'styled-components';
import { ServiceOfferCard } from './serviceOfferCard';

export const ServiceOffers = ({ serviceOfferList }) => {
	return (
		<ServiceOfferLayout>
			<ServiceOfferSection className="column">
				<Title>서비스 적용 제안</Title>
				<ServiceCards center={serviceOfferList.length < 3}>
					{serviceOfferList?.map((feature, idx) => {
						return (
							<ServiceOfferCard
								key={idx}
								title={feature.title}
								description={feature.description}
								idx={idx + 1}
								img={feature.img}
							/>
						);
					})}
				</ServiceCards>
			</ServiceOfferSection>
		</ServiceOfferLayout>
	);
};
const ServiceOfferLayout = styled.section`
	padding: 100px 0;
`;
const ServiceOfferSection = styled.section`
	border-radius: 4px;
	max-width: 1200px;
	margin: 0 auto;
	gap: 60px;
`;
const Title = styled.div`
	font-weight: 600;
	font-size: 34px;
	line-height: 41px;
	text-align: center;
	color: #0c0e1c;
`;
const ServiceCards = styled.article`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-self: ${(props) => props.center && 'center'};
	gap: 30px;
`;
