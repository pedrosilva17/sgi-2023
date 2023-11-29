import * as THREE from "three";
import { MyTrack } from "../custom/MyTrack.js";
import { MyRoute } from "../custom/MyRoute.js";
import { MyObstacle } from "../custom/MyObstacle.js";

class MyReader {
    constructor(app) {
        this.app = app;
        this.type = 'Group';
        this.meshes = [];
        this.objects = {};
    }

    createTrack(track, width) {
        const points = this.parsePoints(track);
        const trackObj = new MyTrack(this.app, width, points);
        this.objects["track"] = trackObj;
        return trackObj;
    }

    createRoute(route) {
        const points = this.parsePoints(route);
        const routeObj = new MyRoute(this.app, points);
        this.objects["route"] = routeObj;
        return routeObj;
    }

    createPowerUps() {}

    createObstacles(obstacles) { 
        this.objects["obstacles"] = [];   
        const points = this.parsePoints(obstacles);
        for (const point of points) {
            const obstacleObj = new MyObstacle(this.app, point);
            this.objects["obstacles"].push(obstacleObj);
        }
        return this.objects["obstacles"];
    }

    parsePoints(pointString) {
        const pointArray = pointString.split(" ");
        if (pointArray.length % 2 != 0) throw SyntaxError("Coordinate number is not even.");
        const points = [];
        for (let i = 0; i < pointArray.length - 1; i=i+2) {
            const point = new THREE.Vector3(parseInt(pointArray[i]), 0, parseInt(pointArray[i+1]));
            points.push(point);
          }
        return points;
    }
}

export {MyReader};