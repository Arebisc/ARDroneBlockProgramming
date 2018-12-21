export interface DroneNavData {
    header: number;
    droneState: DroneState;
    sequenceNumber: number;
    visionFlag: number;
    demo: DemoData;
}

export interface DroneState {
    flying: number;
    videoEnabled: number;
    visionEnabled: number;
    controlAlgorithm: number;
    altitudeControlAlgorithm: number;
    startButtonState: number;
    controlCommandAck: number;
    cameraReady: number;
    travellingEnabled: number;
    usbReady: number;
    navdataDemo: number;
    navdataBootstrap: number;
    motorProblem: number;
    communicationLost: number;
    softwareFault: number;
    lowBattery: number;
    userEmergencyLanding: number;
    timerElapsed: number;
    MagnometerNeedsCalibration: number;
    anglesOutOfRange: number;
    tooMuchWind: number;
    ultrasonicSensorDeaf: number;
    cutoutDetected: number;
    picVersionNumberOk: number;
    atCodecThreadOn: number;
    navdataThreadOn: number;
    videoThreadOn: number;
    acquisitionThreadOn: number;
    controlWatchdogDelay: number;
    adcWatchdogDelay: number;
    comWatchdogProblem: number;
    emergencyLanding: number;
}

export interface DemoData {
    controlState: string;
    flyState: string;
    batteryPercentage: number;
    rotation: Rotation;
    frontBackDegrees: number;
    leftRightDegrees: number;
    clockwiseDegrees: number;
    altitude: number;
    altitudeMeters: number;
    velocity: Velocity;
    xVelocity: number;
    yVelocity: number;
    zVelocity: number;
    frameIndex: number;
    detection: Detection;
    drone: Drone;
}

export interface Rotation {
    frontBack: number;
    pitch: number;
    theta: number;
    y: number;
    leftRight: number;
    roll: number;
    phi: number;
    x: number;
    clockwise: number;
    yaw: number;
    psi: number;
    z: number;
}

export interface Velocity {
    x: number;
    y: number;
    z: number;
}

export interface Rotation2 {
    m11: number;
    m12: number;
    m13: number;
    m21: number;
    m22: number;
    m23: number;
    m31: number;
    m32: number;
    m33: number;
}

export interface Translation {
    x: number;
    y: number;
    z: number;
}

export interface Camera {
    rotation: Rotation2;
    translation: Translation;
    type: number;
}

export interface Detection {
    camera: Camera;
    tagIndex: number;
}

export interface Rotation3 {
    m11: number;
    m12: number;
    m13: number;
    m21: number;
    m22: number;
    m23: number;
    m31: number;
    m32: number;
    m33: number;
}

export interface Translation2 {
    x: number;
    y: number;
    z: number;
}

export interface Camera2 {
    rotation: Rotation3;
    translation: Translation2;
}

export interface Drone {
    camera: Camera2;
}
