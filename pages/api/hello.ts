import type { NextApiRequest, NextApiResponse } from "next"
const { exec } = require('child_process')


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    const print = await runPrinter(req)
    res.status(201).json("hi")

  }else{
    res.status(201).json("as")
  }
}
async function runPrinter(req: NextApiRequest){
  const values = JSON.parse(req.body)

  let jsonString = ''

  for (const key in values) {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
     jsonString += `${key} ${values[key]} `
   
    }
  }
  
  console.log(jsonString)
  exec(`scanimage ${jsonString}`, (err:any, output:any) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
    // log the output received from the command
    console.log("Scan success")
})
}

