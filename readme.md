# lottery system

Express RESTful API server for a continuously and periodically lottery system

## Development

### database
```
docker-compose -f docker-compose-pg-only.yml up
```

### Database init
```
npm install
npm run build
node ./dist/deploy/databaseInit.js
```

### Start app
```
npm run dev
```


## Deployment
```
docker-compose build
docker-compose up -d
```


# REST API


## Get lottery info
`GET /api/lottery`

### Response
```
{
    "currentLottery": {
        "id": 2,
        "finishedAt": null,
        "createdAt": "2023-06-05T09:32:32.240Z",
        "updatedAt": "2023-06-05T09:32:32.240Z"
    },
    "previousLottery": {
        "id": 1,
        "finishedAt": "2023-06-05T09:32:32.238Z",
        "createdAt": "2023-06-05T09:32:26.929Z",
        "updatedAt": "2023-06-05T09:32:32.238Z",
        "tickets": [
            {
                "id": 1,
                "lotteryId": 1,
                "ticketId": "f1a22d91-749a-4a3b-a9f1-3d1537d34a57",
                "contestantId": 1,
                "isWinner": true,
                "createdAt": "2023-06-05T09:32:26.938Z",
                "updatedAt": "2023-06-05T09:32:32.235Z"
            }
        ]
    }
}
```


## Get lottery by id 
`GET /api/lottery/:id`

### Response
```
{
    "id": 1,
    "finishedAt": "2023-06-05T09:32:32.238Z",
    "createdAt": "2023-06-05T09:32:26.929Z",
    "updatedAt": "2023-06-05T09:32:32.238Z",
    "tickets": [
        {
            "id": 1,
            "lotteryId": 1,
            "ticketId": "f1a22d91-749a-4a3b-a9f1-3d1537d34a57",
            "contestantId": 1,
            "isWinner": true,
            "createdAt": "2023-06-05T09:32:26.938Z",
            "updatedAt": "2023-06-05T09:32:32.235Z"
        }
    ]
}
```

## Get ticket by id 
`GET /api/ticket/:id`

### Response
```
{
    "id": 1,
    "lotteryId": 1,
    "ticketId": "f1a22d91-749a-4a3b-a9f1-3d1537d34a57",
    "contestantId": 1,
    "isWinner": true,
    "createdAt": "2023-06-05T09:32:26.938Z",
    "updatedAt": "2023-06-05T09:32:32.235Z"
}
```

## Generate Ticket
`POST /api/ticket`

### Body
```
Content-Type application/json; charset=utf-8

{ "contestantId": "1" }
```

### Response
- Success
  - Code 200
  - Content
```
{
    "isWinner": false,
    "id": 2,
    "lotteryId": 22,
    "contestantId": 1,
    "ticketId": "f00d8967-364f-40f6-8edb-a5dd141b9ea1",
    "updatedAt": "2023-06-05T09:35:59.560Z",
    "createdAt": "2023-06-05T09:35:59.560Z"
}
```

- Fail (ticket already exist)
  - Code 409
  - Content
```
{ "error": "ticket already exist" }
```

- Fail (contestant Not exist)
  - Code 404
  - Content
```
{ "error": "contestant Not exist" }
```


## Get Contestant
`Get /contestant/:id`

### Response
- Success
  - Code 200
```
{
    "id": 5,
    "name": "test2",
    "createdAt": "2023-06-05T08:58:22.540Z",
    "updatedAt": "2023-06-05T08:58:22.540Z",
    "tickets": [
        {
            "id": 1,
            "lotteryId": 31,
            "ticketId": "e2677cf0-ddd9-4156-933b-e3413091e5a5",
            "contestantId": 5,
            "isWinner": true,
            "createdAt": "2023-06-05T08:58:33.054Z",
            "updatedAt": "2023-06-05T08:58:42.091Z"
        }
    ]
}
```

- Fail
  - Code 404
```
{ "error": "contestant Not exist" }
```

## Create contestant
`POST /contestant`

### Response
- Success
  - Code 200
```
{
    "id": 1,
    "name": "test2",
    "updatedAt": "2023-06-05T09:32:23.599Z",
    "createdAt": "2023-06-05T09:32:23.599Z"
}
```

## Delete contestant
`Delete /contestant`

### Response
- Success
  - Code 204
```
{ "message": "Contestant deleted successfully" }
```

- Fail 
  - Code 404
```
{ "error": "Contestant not exist" }
```


## Update contestant
`PaATCH /contestant/:id`

### Body
```
Content-Type application/json; charset=utf-8

{ "name": "test1" }
```

### Response
- Success
  - Code 204
```
{
    "id": 1,
    "name": "test1",
    "createdAt": "2023-06-05T09:32:23.599Z",
    "updatedAt": "2023-06-05T09:48:45.577Z"
}
```

- Fail 
  - Code 404
```
{ "error": "Contestant not exist" }
```
