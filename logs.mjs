import shell from "shelljs";
import express from 'express';
import cors from 'cors';
import process from 'process';


const app = express();
app.use(cors());

console.log("Test");
// updates EIPs folder to check recent commits
shell.exec(`cd EIPS`);
shell.exec(`git init`);
shell.exec(`git remote add -f origin https://github.com/ethereum/EIPs.git `);
shell.exec(`git config core.sparseCheckout true`);
shell.exec(`git sparse-checkout init`);
shell.exec(`git sparse-checkout set EIPS`);
shell.exec(`git pull origin master`);
shell.exec(`git config core.sparseCheckout false`);

// logs all the commits in log.log file 
shell.exec(`git log --pretty=format:"%h%x09%ad%" --name-only > log.log`);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3002;
}

app.listen(port,()=>{
    console.log('Server is running at port 3002');
})
  