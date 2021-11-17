
import React from "react";

const body = {
	fontFamily: "arial",
	padding: "10px",
	width: "200px",
	overflow: "scroll"
};

function Sidebar() {
	return (
		<div>
			<form style={body}>
				<label value="Categories" style={{ fontSize: 14 }}>
					Categories
				</label>
				<select style={{ width: "110px", fontSize: 12 }}>
					<option value="furniture">Furniture</option>
					<option value="appliances">Appliances</option>
					<option value="household">Household</option>
					<option value="electronics">Electronics</option>
					<option value="gardening">Gardening</option>
					<option value="automotive">Automotive</option>
					<option value="sporting">Sporting</option>
					<option value="books">Books</option>
					<option value="gaming">Gaming</option>
				</select>
				<label value="MilesLocation" style={{ fontSize: 14 }}>
					Miles From Location
				</label>
				<option value="Miles" style={{ fontSize: 12 }}>
					Miles:
				</option>
				<input
					type="number"
					style={{ width: "90px", height: "25px" }}
				/>
				<option value="FromZip" style={{ fontSize: 12 }}>
					From ZIP:
				</option>
				<input
					type="number"
					style={{ width: "90px", height: "25px" }}
				/>
				<label value="DatePost" style={{ fontSize: 14 }}>
					Date Posted
				</label>
				<select
					style={{ width: "130px", height: "40px", fontSize: 12 }}
				>
					<option value="24hr">Past 24 Hours</option>
					<option value="week">Past Week</option>
					<option value="2week">Past 2 Weeks</option>
					<option value="month">Past Month</option>
					<option value="year">Past Year</option>
				</select>
				<label value="Price" style={{ fontSize: 14 }}>
					Price
				</label>
				<option value="Min" style={{ fontSize: 12 }}>
					Min:
				</option>
				<input
					type="number"
					style={{ width: "90px", height: "25px" }}
				/>
				<option value="Max" style={{ fontSize: 12 }}>
					Max:
				</option>
				<input
					type="number"
					style={{ width: "90px", height: "25px" }}
				/>
				<label value="Condition" style={{ fontSize: 14 }}>
					Condition
				</label>
				<input type="checkbox" />
				New
				<br />
				<input type="checkbox" />
				Like New
				<br />
				<input type="checkbox" />
				Good
				<br />
				<input type="checkbox" />
				Used
				<br />
			</form>
		</div>
	);
}

export default Sidebar;