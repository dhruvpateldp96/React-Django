
import {backendLookup} from '../lookup'

export function apitweetCreate(newTweet, callback){
    backendLookup("POST","/tweets/create",callback, {content: newTweet})
}

export function apitweetAction(tweetId, action, callback){
    const data = {id: tweetId, action: action}
    backendLookup("POST","/tweets/action",callback, data)
}

export function apitweetList(callback){

    backendLookup("GET","/tweets",callback)
}