export interface DroneNavData {
    header: number;
    droneState: DroneState;
    sequenceNumber: number;
    visionFlag: number;
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