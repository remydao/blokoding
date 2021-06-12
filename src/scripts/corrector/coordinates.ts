

const MAX_VERTICAL_ERROR = 100;

const modifyCoordinates = (visionResp: any[]) => {

    console.log(visionResp);

    for (let i = 0; i < visionResp.length - 1; i++) {
        if (visionResp[i + 1].bounding.left < visionResp[i].bounding.left 
            && visionResp[i + 1].bounding.top > visionResp[i].bounding.top
            && visionResp[i + 1].bounding.top < visionResp[i].bounding.top + MAX_VERTICAL_ERROR) {
            let tmp = visionResp[i + 1];
            visionResp[i + 1] = visionResp[i];
            visionResp[i] = tmp;
        }
    }
}


export { modifyCoordinates };