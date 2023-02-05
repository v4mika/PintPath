import {sin, cos, acos, pi} from 'mathjs'

function dtr(n) {
    return n * (180/Math.PI)
}

function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = dtr(lat2-lat1);
    var dLon = dtr(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(dtr(lat1)) * Math.cos(dtr(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function shortestRoute(points) {
    
}

export default distance