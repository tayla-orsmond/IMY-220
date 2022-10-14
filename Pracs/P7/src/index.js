var users = [
	{username: "DanielIsCool", name: "Daniel",surname: "Daniels", age: "23"},
	{username: "Username123", name: "Bob",surname: "Dabuilder", age: "25"},
	{username: "NotWilliam", name: "William",surname: "Anderson", age: "24"},
	{username: "IDontNodeWhatImDoing", name: "Tom",surname: "Garfield", age: "24"},
	{username: "BillieEyelash", name: "Michael",surname: "Scarn", age: "27"},
	{username: "MomsSpaghetti", name: "Marshall",surname: "Matters", age: "49"},
	{username: "Hugo", name: "Glen",surname: "Coco", age: "17"}
];

//Tayla Orsmond u21467456

//importing react
import React from "react";
import ReactDOM from "react-dom";

//userlist component
import {UserList} from "./UserList.js";

//render
ReactDOM.render(
	<UserList users={users}/>,
	document.getElementById("root")
);
