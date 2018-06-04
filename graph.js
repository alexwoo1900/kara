function lerp(start, end, t) {
    return start + t * (end - start);
}

function lerp_point(p0, p1, t) {
    return new Point(lerp(p0.x, p1.x, t), lerp(p0.y, p1.y, t));
}

function diagonal_distance(p0, p1) {
    var dx = p1.x - p0.x, dy = p1.y - p0.y;
    return Math.max(Math.abs(dx), Math.abs(dy));
}

function round_point(p) {
    return new Point(Math.round(p.x), Math.round(p.y));
}

function line(p0, p1) {
    var points = [];
    var N = diagonal_distance(p0, p1);
    for (var step = 0; step <= N; ++step) {
        var t = N == 0 ? 0.0 : step / N;
        points.push(round_point(lerp_point(p0, p1, t)));
    }
    return points;
}

/**
 * Orthogonal steps
 * 
 * @param {start point} p0 
 * @param {end point} p1 
 */
function walk_grid(p0, p1) {
    var dx = p1.x - p0.x, dy = p1.y - p0.y;
    var nx = Math.abs(dx), ny = Math.abs(dy);
    var sign_x = dx > 0 ? 1 : -1, sign_y = dy > 0 ? 1 : -1;

    var p = new Point(p0.x, p0.y);
    var points = [new Point(p.x, p.y)];
    for (var ix = 0, iy = 0; ix < nx || iy < ny;) {
        if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
            p.x += sign_x;
            ix++;
        } else {
            p.y += sign_y;
            iy++;
        }
        points.push(new Point(p.x, p.y));
    }
    return points;
}

/**
 * Supercover lines
 * 
 * @param {start point} p0 
 * @param {end point} p1 
 */
function supercover_line(p0, p1) {
    var dx = p1.x - p0.x, dy = p1.y - p0.y;
    var nx = Math.abs(dx), ny = Math.abs(dy);
    var sign_x = dx > 0 ? 1 : -1, sign_y = dy > 0 ? 1 : -1;

    var p = new Point(p0.x, p0.y);
    var points = [new Point(p.x, p.y)];
    for (var ix = 0, iy = 0; ix < nx || iy < ny;) {
        if ((0.5 + ix) / nx == (0.5 + iy) / ny) {
            p.x += sign_x;
            p.y += sign_y;
            ix++;
            iy++;
        } else if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
            p.x += sign_x;
            ix++;
        } else {
            p.y += sign_y;
            iy++;
        }
        points.push(new Point(p.x, py));
    }
    return points;
}