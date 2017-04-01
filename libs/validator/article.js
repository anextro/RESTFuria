module.exports = function(obj){

    //validate title
    if( !(obj && obj.title && obj.title.length > 0) ) return false;

    //validate content
    if( !(obj && obj.content && obj.content.length > 0) ) return false;

    return true;

}