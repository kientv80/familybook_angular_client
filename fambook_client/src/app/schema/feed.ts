import { Action } from "./action";
import { Comment } from "./comment";
import { ShortProfile } from "./shortprofile";

export class Feed{
	id : number;
	ownerId : number;
	feedId: number ;
	type : number;
	content: String;
	desc : String;
	website : String;
	images : String[];
	postedDate: String;
	title: String;
	url :  String;
	likeUserIds : String;
	likeCount : number;
	commentCount : number;
	comments : Comment[];
}