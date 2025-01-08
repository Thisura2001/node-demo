import http from "http";
import fs from "fs";


export function Routes(req: http.IncomingMessage, res: http.ServerResponse){
    console.log(req.url, req.method);

    if(req.url == "/add"){
        res.setHeader("content-type", "text/html");
        res.write('<html><body><form action = "/items" method = "POST"><input type = "text" name = "item"/><button type = "submit">Submit</button></form></body></html>');
        res.end();
    }

    if(req.url == '/items' && req.method == 'POST'){
        const body:Buffer[] = []

        req.on('data', (data: Buffer) => {
            body.push(data);
        });

        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const itemName = parsedBody.split('=')[1];
            fs.writeFile('items.txt',itemName,()=>{
                res.write('item list');
                res.end()
            })
        })
    }
}