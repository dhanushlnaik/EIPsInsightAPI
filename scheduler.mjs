import schedule  from 'node-schedule'; // Scheduler
import shell from "shelljs";
import express from 'express';
import cors from 'cors';
import process from 'process';


const app = express();
app.use(cors());

console.log("Test");
const job = schedule.scheduleJob('10 * * * * *', function(){
    console.log('running every 10th Sec');
    shell.exec(`cd EIPs`);
    shell.exec(`git init`);
    shell.exec(`git remote add -f origin https://github.com/ethereum/EIPs.git `);
    shell.exec(`git config core.sparseCheckout true`);
    shell.exec(`git sparse-checkout init`);
    shell.exec(`git sparse-checkout set EIPS`);
    shell.exec(`git pull origin master`);
    // shell.exec(`git sparse-checkout list`);
    shell.exec(`git config core.sparseCheckout false`);
  });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,()=>{
    console.log('Server is running at port 3000');
})
  