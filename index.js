const mysql=require("mysql");
const express=require("express");

var app=express();

const bodyparser=require("body-parser");

app.use(bodyparser.json());

var mysqlConnection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"employeedb"
});

mysqlConnection.connect((err)=>{
	if(!err)
		console.log("database connection connected.");
	else
		console.log("database connection failed."+JSON.stringify(err,undefined,2));
});

app.listen(3000,()=>console.log("Express server is runing on at port no:3000"));

// geting all record from database
app.get("/employees",(req,res)=>{
	mysqlConnection.query("SELECT * FROM employee",(err,rows,fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});


// get record by user id
app.get("/employees/:id",(req,res)=>{
	mysqlConnection.query("SELECT * FROM employee WHERE empid=?",[req.params.id],(err,rows,fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});