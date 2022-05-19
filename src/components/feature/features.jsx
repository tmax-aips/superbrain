import React from 'react';
import styled from 'styled-components';
import { FeatureCard } from './featureCard';

export const Features = ({ title, featureList, height }) => {
	return (
		<FeaturesLayout height={height} title={title}>
			<FeaturesSection className="column">
				{title ? <Title>{title} 특장점</Title> : ''}

				{featureList.map((featureObj) => {
					return (
						<FeatureCards key={featureObj.id} className="flex gap-32">
							{featureObj.list.map((feature) => (
								<FeatureCard
									key={feature.title}
									cardWidth={featureObj.cardWidth}
									horozontal={featureObj.ishorizontal}
									title={feature.title}
									description={feature.description}
									svg={feature.svg}
								/>
							))}
						</FeatureCards>
					);
				})}
			</FeaturesSection>
		</FeaturesLayout>
	);
};
const FeaturesLayout = styled.section`
	min-height: ${(props) => props.height};
	${(props) => (props.title ? `padding-top: 100px;` : `padding-bottom: 100px`)}
`;

const FeaturesSection = styled.section`
	border-radius: 4px;
	max-width: 1200px;
	margin: 0 auto;
	gap: 32px;
`;
const Title = styled.div`
	font-weight: 600;
	font-size: 34px;
	line-height: 41px;
	text-align: center;
	color: white;
`;
const FeatureCards = styled.article`
	justify-content: center;
`;
