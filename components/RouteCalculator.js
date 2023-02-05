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

export function shortestRoute(points_n, pubs_selected) {
    var points = [...points_n]
    function closestPoint(a, points) {
        var min_dist = 10000000000
        var nxt_pub;
        for (var i = 0; i < points.length; i++) {
            var dist = distance(a.position.lat, a.position.lng, points[i].position.lat, points[i].position.lng)
            if (dist < min_dist) {
                min_dist = dist
                nxt_pub = i
            }
        }
        return nxt_pub
    }
    var pub_crawl = [points[0]]
    points = points.slice(1)
    var n = points.length
    for (var i = 0; i < pubs_selected - 1; i++) {
        var new_pub = closestPoint(pub_crawl[i], points)
        points[new_pub].selected = true
        pub_crawl.push(points[new_pub])
        points.splice(new_pub, 1)
    }
    return pub_crawl
}

export function sortRoutes(points, lat, lng) {
    function dist(a, b) {
        var a_dist = distance(a.position.lat, a.position.lng, lat, lng)
        var b_dist = distance(b.position.lat, b.position.lng, lat, lng)

        return a_dist - b_dist
    }
    points.sort(dist)
}

export default {shortestRoute, sortRoutes}