const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.post('/', (req, res) => {
    const queryText = `INSERT INTO "timesheet" ( "t_user_id", "t_client_id", "clock_in", "loc_1", "is_clocked_in", "notification")
    VALUES ($1, $2, current_timestamp, $3, true, false);`;
    const queryValues = [req.user.id, req.body.clientId, req.body.location];
    // 27 needs to be emnployee id
    pool.query(queryText, queryValues)
        .then( result => {
            res.sendStatus(201);
        }).catch( err => {
            console.log( err );
            res.sendStatus(500);
        })
})

router.put('/', (req, res) => {
    const queryText = `UPDATE "timesheet"
    SET "clock_out" = current_timestamp,
    "loc_2" = $1,
    "is_clocked_in" = false,
    "work_type" = $2,
    "notes" = $3
    WHERE "timesheet".timesheet_id = $4;`;
    const queryValues = [ req.body.loc_2, req.body.work_type, req.body.notes, req.body.timesheet_id ];
    // 27 needs to be emnployee id
    pool.query(queryText, queryValues)
        .then( result => {
            res.sendStatus(201);
        }).catch( err => {
            console.log( err );
            res.sendStatus(500);
        })
})

router.get('/client/:id', (req, res) => {
    console.log(req.params);
    console.log('server client id', req.params.id);
    const queryText = `SELECT * FROM "client"
    WHERE client_id = $1;`;
    const queryValues = [ req.params.id ];

    pool.query(queryText, queryValues)
    .then( result => {
        res.send(result.rows[0]);
        // console.log('results!', result.rows[0]);
        // res.sendStatus(201);
    }).catch( err => {
        console.log( err );
        res.sendStatus(500);
    })
})

router.get('/user', (req, res) => {
    const queryText = `SELECT * FROM "timesheet"
    JOIN "client"
    ON "timesheet".t_client_id = "client".client_id
    JOIN "user_client"
    ON "user_client".j_client_id = "client".client_id
    WHERE "timesheet".is_clocked_in = true AND "timesheet".t_user_id = $1;`;
    const queryValues = [req.user.id];
    pool.query(queryText, queryValues)
    .then( result => {
        res.send(result.rows[0]);
        // console.log('results!', result.rows[0]);
    }).catch( err => {
        console.log( err );
        res.sendStatus(500);
    })
})


module.exports = router;