import express from 'express';
import * as eventCtrl from './event.ctrl';

const event = express.Router();

event.get('/', eventCtrl.getEvent);

export default event;