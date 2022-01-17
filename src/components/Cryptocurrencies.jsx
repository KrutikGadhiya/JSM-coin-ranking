import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	//console.log({cryptos})

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	if (isFetching) return <Loader />;

	return (
		<>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}
			<Row gutter={[16, 16]} className="crypto-card-container">
				{cryptos?.map((curr) => (
					<Col key={curr.uuid} xs={24} sm={12} lg={6} className="crypto-card">
						<Link to={`/crypto/${curr.uuid}`}>
							<Card
								title={`${curr.rank}. ${curr.name}`}
								extra={
									<img
										className="crypto-image"
										src={curr.iconUrl}
										alt={curr.name}
									/>
								}
								hoverable
							>
								<p>Price: {millify(curr.price)}</p>
								<p>Market Cap: {millify(curr.marketCap)}</p>
								<p>Daily Change: {millify(curr.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
