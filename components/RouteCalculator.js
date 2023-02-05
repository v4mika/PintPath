function dtr(n) {
    return n * (180/Math.PI)
}

function distance(lat1, lon1, lat2, lon2) {
   var d = Math.sqrt(
    Math.pow(lat2 - lat1, 2) +
    Math.pow(lon2 - lon1, 2)
   )
    return d;
}

export function shortestRoute(points) {

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
    var sorted_points = [points[0]]
    points = points.slice(1)
    var n = points.length
    for (var i = 0; i < n; i++) {
        var new_pub = closestPoint(sorted_points[i], points)
        sorted_points.push(points[new_pub])
        points.splice(new_pub, 1)
    }
    return sorted_points
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