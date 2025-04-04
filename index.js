import http from 'http';  //  Import the 'http' module, which lets Node.js create web servers.  Think of it as bringing in the basic tools for building a website connection.
import fs from 'fs';      //  Import the 'fs' (file system) module.  This allows Node.js to work with files on your computer, like reading your HTML file.
import path from 'path';    // Import the 'path' module.  This helps us work with file paths in a way that works on different operating systems.

const server = http.createServer((req, res) => {  //  Creates a web server.  'http.createServer' takes a function as an argument.  This function is what gets run every time someone makes a request to your server (like when they open your website).
  //  'req' stands for "request".  It's an object containing all the information about the incoming request (e.g., what page the user asked for).
  //  'res' stands for "response".  It's an object you use to send data back to the user (e.g., the HTML of your page).

  const filePath = path.join(__dirname, 'basic.html'); //  Constructs the full path to your 'basic.html' file.
  //  '__dirname' is a special variable in Node.js that holds the directory where your script is located.
  //  'path.join' combines the directory name with the file name in a way that works on any operating system (Windows, macOS, Linux).  So if your script is in /myproject, and your file is basic.html, this makes the full path /myproject/basic.html

  fs.readFile(filePath, (err, data) => {  //  Reads the contents of your 'basic.html' file.
    //  'fs.readFile' is a function that takes the file path and another function (a "callback") as arguments.
    //  The callback function is executed *after* the file has been read.
    //  'err' stands for "error".  If there was a problem reading the file (e.g., the file doesn't exist), this variable will contain an error object.  Otherwise, it will be null.
    //  'data' is the content of the file (in this case, the HTML code).

    if (err) {  //  Checks if there was an error reading the file.
      res.writeHead(500, { 'Content-Type': 'text/plain' });  //  Sends an HTTP "Internal Server Error" status code (500) back to the client.
      //  'res.writeHead' sets the headers of the response.  Headers contain information *about* the data being sent (e.g., the content type).
      //  'Content-Type': 'text/plain' tells the browser that we're sending plain text, not HTML.
      res.end('Internal Server Error');  //  Sends the error message as the response body.  'res.end' finishes the response.
      console.error(err); //  Prints the error to the console, which is helpful for debugging.
      return; //  Stops processing the request here, after sending the error.  Important!
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });  //  If there was no error, send a "OK" status code (200) and tell the browser we're sending HTML.
    res.end(data);  //  Send the HTML content of the file as the response.  The 'data' variable contains the HTML from basic.html
  });
});

const port = process.env.PORT || 3000;  //  Defines the port number the server will listen on.
//  'process.env.PORT' is an environment variable.  Vercel will set this, so your server listens on the correct port.
//  If 'process.env.PORT' is not defined (e.g., when you're running the code on your own computer), it defaults to 3000.

server.listen(port, () => {  //  Starts the server and listens for incoming requests on the specified port.
  //  The function passed to 'server.listen' is another callback function that gets called when the server starts listening.
  console.log(`Server running at http://localhost:${port}/`);  //  Prints a message to the console indicating that the server is running.  This is helpful for you, the developer.
});

export default server; //  Exports the 'server' object.  This is necessary for Vercel to be able to use your server.
