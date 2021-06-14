import {check, request, PERMISSIONS, RESULTS} from "react-native-permissions";
import {Platform} from 'react-native'

const PLATFORM_CAMERA_PERMISSIONS: any = {
    ios: PERMISSIONS.IOS.CAMERA,
    android:PERMISSIONS.ANDROID.CAMERA
}

const REQUEST_PERMISSION_TYPE: any = {
    camera: PLATFORM_CAMERA_PERMISSIONS
}

const PERMISSION_TYPE = {
    camera: 'camera'
}

class AppPermission {
    checkPermission = async (type: string): Promise<boolean> => {
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        if (!permissions) {
            return true;
        }
        try {
            const result = await check(permissions)
            if (result === RESULTS.GRANTED) return true
            return this.requestPermission(permissions)
        } catch(error){
            return false;
        }
    }

    requestPermission = async (permissions: any): Promise<boolean> =>{
        try {
            const result = await request(permissions)
            return result === RESULTS.GRANTED
        } catch(error) {
            return false
        }
    }
}

const Permission = new AppPermission()
export {Permission, PERMISSION_TYPE}