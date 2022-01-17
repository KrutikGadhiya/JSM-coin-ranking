import React, { useState } from "react";
import { Row, Col, Select, Avatar, Table } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import millify from "millify";

import {
	useGetCryptosQuery,
	useGetCryptoExchangeDetailsQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";

const { Option } = Select;
const { Column } = Table;

const Exchanges = () => {
	const [coinId, setCoinId] = useState("Qwsogvtv82FCd");
	const { data: exchangesData } = useGetCryptoExchangeDetailsQuery(coinId);
	const { data, isFetching } = useGetCryptosQuery(100);

	const exchanges = exchangesData?.data?.exchanges;

	// console.log(exchangesData);

	if (isFetching) return <Loader />;

	return (
		<>
			<Row gutter={[24, 24]}>
				<Col span={24}>
					<Select
						className="select-news"
						defaultValue={"Qwsogvtv82FCd"}
						placeholder="Select a Crypto"
						optionFilterProp="children"
						onChange={(value) => setCoinId(value)}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						{data?.data?.coins?.map((coin) => (
							<Option value={coin.uuid}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			</Row>
			<Row>
				<Table className="exchanges-table" dataSource={exchanges}>
					<Column align="center" title="Rank" dataIndex="rank" key="rank" />
					<Column
						align="center"
						title="Logo"
						dataIndex="iconUrl"
						key="iconUrl"
						render={(val) => <Avatar className="exchange-image" src={val} />}
					/>
					<Column align="center" title="Name" dataIndex="name" key="name" />
					<Column
						align="center"
						title="24H Trade Volume"
						dataIndex="24hVolume"
						key="24hVolume"
						render={(val) => <>${millify(val)}</>}
					/>
					<Column
						align="center"
						title="Markets"
						dataIndex="numberOfMarkets"
						key="numberOfMarkets"
						render={(val) => <>{millify(val)}</>}
					/>
					<Column
						align="center"
						title="BTC Price"
						dataIndex="btcPrice"
						key="btcPrice"
						render={(val) => <>{millify(val)}</>}
					/>
					<Column
						align="center"
						title="Verified"
						dataIndex="verified"
						key="verified"
						render={(val) => (val ? <CheckOutlined /> : <CloseOutlined />)}
					/>
					<Column
						align="center"
						title="Recommended"
						dataIndex="recommended"
						key="recommended"
						render={(val) => (val ? <CheckOutlined /> : <CloseOutlined />)}
					/>
				</Table>
			</Row>
		</>
	);
};

export default Exchanges;
