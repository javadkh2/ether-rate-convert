## ETH Rate Convertor

This service is designed for normalizing rate of ether (different units) per time (different units) to wei/hour.
It received rate as query string in the following format
```
GET /eth-rate-convert?<number> <ETHUnit> / <timeUnit>
```
The valid Ether units are
* Ether
* Milliether
* Microether
* Gwei
* Mwei
* Kwei
* Wei

The valid Time units are
* Second
* Minute
* Hour
* Day

Result is the following format
```
{ "result" : <rate_in_wei_per_hour> }
```
In case of errors, the status code will be *400* and the result will be in this format
```
{ "error" : <error_message> }
```
#
### Installation
The project is prepared for deploy on heroku but it also consist of *docker-compose* file, for clone and start the project manually use the following steps,
```
git clone https://github.com/javadkh2/ether-rate-convert.git
```
This command clone the project source code.
```
cd ether-rate-convert
```
Now you must install dependencies with the following command
```
npm install
```
Now the project is ready for run. by below command you can run it locally
```
npm start
```
For run test use this command
```
npm test
```
For run code coverage in test units use this command
```
npm run test-coverage
```
The result of code coverage will be exist on coverage folder
#
### Using docker
There a *docker-compose.yml* file in the root of project.
```
version: '3'
services:
  api:
    image: node:alpine
    command: node /app/dist/index.js
    environment:
      PORT: 3000
    ports:
      - '3000:3000'
    volumes:
      - ./:/app  
```

For running it use the following command
```
docker-compose up
```
