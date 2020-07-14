import express from 'express';
import * as bookmarkCtrl from './bookmark.ctrl';

const bookmark = express.Router();

bookmark.post('/findbookmark', bookmarkCtrl.findBookmark);
bookmark.post('/addbookmark', bookmarkCtrl.AddBookmark);
bookmark.delete('/', bookmarkCtrl.DeleteBookmark);
bookmark.post('/getbookmark', bookmarkCtrl.getBookmark);

export default bookmark;
