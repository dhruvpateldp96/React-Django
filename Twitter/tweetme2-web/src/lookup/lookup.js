
import {backendLookup} from '../lookup'
export function apitweetCreate(newTweet, callback){
    backendLookup("POST","/tweets/create",callback, {content: newTweet})
  }
  
  export function apitweetList(callback){
  
    backendLookup("GET","/tweets",callback)
  }