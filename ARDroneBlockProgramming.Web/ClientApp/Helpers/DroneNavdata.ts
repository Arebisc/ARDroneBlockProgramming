export interface DroneEstimatedPosition {
    x: number;
    y: number;
    z: number;
}

export interface DroneNavData {
    header: number;
    droneState: DroneState;
    sequenceNumber: number;
    visionFlag: number;
    demo: Demo;
    adcDataFrame: AdcDataFrame;
    altitude: Altitude;
    eulerAngles: EulerAngles;
    games: Games;
    gps: Gps;
    gyrosOffsets: GyrosOffsets;
    hdvideoStream: HdvideoStream;
    kalmanPressure: KalmanPressure;
    magneto: Magneto;
    physMeasures: PhysMeasures;
    pressureRaw: PressureRaw;
    pwm: Pwm;
    rawMeasures: RawMeasures;
    rcReferences: RcReferences;
    references: References;
    time: number;
    trackersSend: TrackersSend;
    trims: Trims;
    videoStream: VideoStream;
    vision: Vision;
    visionOf: VisionOf;
    visionPerf: VisionPerf;
    visionRaw: VisionRaw;
    watchdog: number;
    wifi: Wifi;
    windSpeed: WindSpeed;
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

export interface Demo {
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

export interface Accelerometers {
    x: number;
    y: number;
    z: number;
}

export interface Gyroscopes {
    x: number;
    y: number;
    z: number;
}

export interface Gyrometers {
    x: number;
    y: number;
    z: number;
}

export interface Gyroscopes110 {
    x: number;
    y: number;
}

export interface Echo {
    start: number;
    end: number;
    association: number;
    distance: number;
}

export interface Curve {
    time: number;
    value: number;
    ref: number;
}

export interface Us {
    echo: Echo;
    curve: Curve;
}

export interface Echo2 {
    flagIni: number;
    num: number;
    sum: number;
}

export interface RawMeasures {
    accelerometers: Accelerometers;
    gyroscopes: Gyroscopes;
    gyrometers: Gyrometers;
    gyroscopes110: Gyroscopes110;
    gyrometers110: number[];
    batteryMilliVolt: number;
    us: Us;
    usDebutEcho: number;
    usFinEcho: number;
    usAssociationEcho: number;
    usDistanceEcho: number;
    usCourbeTemps: number;
    usCourbeValeur: number;
    usCourbeRef: number;
    echo: Echo2;
    flagEchoIni: number;
    nbEcho: number;
    sumEcho: number;
    altTemp: number;
    altTempRaw: number;
}

export interface Temperature {
    accelerometer: number;
    gyroscope: number;
}

export interface Accelerometers2 {
    x: number;
    y: number;
    z: number;
}

export interface Gyroscopes2 {
    x: number;
    y: number;
    z: number;
}

export interface PhysMeasures {
    temperature: Temperature;
    accelerometers: Accelerometers2;
    gyroscopes: Gyroscopes2;
    alim3V3: number;
    vrefEpson: number;
    vrefIDG: number;
}

export interface GyrosOffsets {
    x: number;
    y: number;
    z: number;
}

export interface EulerAngles {
    theta: number;
    phi: number;
}

export interface Ui {
    time: number;
    theta: number;
    phi: number;
    psi: number;
    psiAccuracy: number;
    seq: number;
}

export interface References {
    theta: number;
    phi: number;
    thetaI: number;
    phiI: number;
    pitch: number;
    roll: number;
    yaw: number;
    psi: number;
    vx: number;
    vy: number;
    thetaMod: number;
    phiMod: number;
    kVX: number;
    kVY: number;
    kMode: number;
    ui: Ui;
}

export interface AngularRates {
    r: number;
}

export interface EulerAngles2 {
    theta: number;
    phi: number;
}

export interface Trims {
    angularRates: AngularRates;
    eulerAngles: EulerAngles2;
}

export interface RcReferences {
    pitch: number;
    roll: number;
    yaw: number;
    gaz: number;
    ag: number;
}

export interface Pwm {
    motors: number[];
    satMotors: number[];
    gazFeedForward: number;
    gazAltitude: number;
    altitudeIntegral: number;
    vzRef: number;
    uPitch: number;
    uRoll: number;
    uYaw: number;
    yawUI: number;
    uPitchPlanif: number;
    uRollPlanif: number;
    uYawPlanif: number;
    uGazPlanif: number;
    motorCurrents: number[];
    altitudeProp: number;
    altitudeDer: number;
}

export interface X {
    x: number;
    y: number;
    z: number;
}

export interface Observer {
    acceleration: number;
    altitude: number;
    x: X;
    state: number;
}

export interface Vb {
    x: number;
    y: number;
}

export interface Estimated {
    vb: Vb;
    state: number;
}

export interface Altitude {
    vision: number;
    velocity: number;
    ref: number;
    raw: number;
    observer: Observer;
    estimated: Estimated;
}

export interface VisionRaw {
    tx: number;
    ty: number;
    tz: number;
}

export interface VisionOf {
    dx: number[];
    dy: number[];
}

export interface Phi {
    trim: number;
    refProp: number;
}

export interface Theta {
    trim: number;
    refProp: number;
}

export interface Capture {
    theta: number;
    phi: number;
    psi: number;
    altitude: number;
    time: number;
}

export interface BodyV {
    x: number;
    y: number;
    z: number;
}

export interface Delta {
    phi: number;
    theta: number;
    psi: number;
}

export interface Gold {
    defined: number;
    reset: number;
    x: number;
    y: number;
}

export interface Vision {
    state: number;
    misc: number;
    phi: Phi;
    theta: Theta;
    newRawPicture: number;
    capture: Capture;
    bodyV: BodyV;
    delta: Delta;
    gold: Gold;
}

export interface VisionPerf {
    szo: number;
    corners: number;
    compute: number;
    tracking: number;
    trans: number;
    update: number;
    custom: number[];
}

export interface Point {
    x: number;
    y: number;
}

export interface TrackersSend {
    locked: number[];
    point: Point[];
}

export interface Rotation4 {
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

export interface Translation3 {
    x: number;
    y: number;
    z: number;
}

export interface VisionDetect {
    nbDetected: number;
    type: number[];
    xc: number[];
    yc: number[];
    width: number[];
    height: number[];
    dist: number[];
    orientationAngle: number[];
    rotation: Rotation4[];
    translation: Translation3[];
    cameraSource: number[];
}

export interface AdcDataFrame {
    version: number;
    dataFrame: number[];
}

export interface Frame {
    size: number;
    number: number;
}

export interface Atcmd {
    sequence: number;
    meanGap: number;
    varGap: number;
    quality: number;
}

export interface Bitrate {
    out: number;
    desired: number;
}

export interface VideoStream {
    quant: number;
    frame: Frame;
    atcmd: Atcmd;
    bitrate: Bitrate;
    data: number[];
    tcpQueueLevel: number;
    fifoQueueLevel: number;
}

export interface Counters {
    doubleTap: number;
    finishLine: number;
}

export interface Games {
    counters: Counters;
}

export interface PressureRaw {
    up: number;
    ut: number;
    temperature: number;
    pressure: number;
}

export interface Raw {
    x: number;
    y: number;
    z: number;
}

export interface Rectified {
    x: number;
    y: number;
    z: number;
}

export interface Offset {
    x: number;
    y: number;
    z: number;
}

export interface Heading {
    unwrapped: number;
    gyroUnwrapped: number;
    fusionUnwrapped: number;
}

export interface Error {
    mean: number;
    variance: number;
}

export interface Magneto {
    mx: number;
    my: number;
    mz: number;
    raw: Raw;
    rectified: Rectified;
    offset: Offset;
    heading: Heading;
    ok: number;
    state: number;
    radius: number;
    error: Error;
}

export interface Compensation {
    theta: number;
    phi: number;
}

export interface WindSpeed {
    speed: number;
    angle: number;
    compensation: Compensation;
    stateX: number[];
    debug: number[];
}

export interface Angle {
    pwm: number;
    pressure: number;
}

export interface Us2 {
    offset: number;
    prediction: number;
}

export interface Covariance {
    alt: number;
    pwm: number;
    velocity: number;
}

export interface Estimated2 {
    altitude: number;
    velocity: number;
    angle: Angle;
    us: Us2;
    covariance: Covariance;
    groundEffect: boolean;
    sum: number;
    reject: boolean;
    uMultisinus: number;
    gazAltitude: number;
    flagMultisinus: boolean;
    flagMultisinusStart: boolean;
}

export interface KalmanPressure {
    offsetPressure: number;
    estimated: Estimated2;
}

export interface StorageFifo {
    nbPackets: number;
    size: number;
}

export interface Usbkey {
    size: number;
    freespace: number;
    remainingTime: number;
}

export interface HdvideoStream {
    hdvideoState: number;
    storageFifo: StorageFifo;
    usbkey: Usbkey;
    frameNumber: number;
}

export interface Wifi {
    linkQuality: number;
}

export interface Channel {
    sat: number;
    cn0: number;
}

export interface Gps {
    latitude: number;
    longitude: number;
    elevation: number;
    hdop: number;
    dataAvailable: number;
    zeroValidated: number;
    wptValidated: number;
    lat0: number;
    lon0: number;
    latFuse: number;
    lonFuse: number;
    gpsState: number;
    xTraj: number;
    xRef: number;
    yTraj: number;
    yRef: number;
    thetaP: number;
    phiP: number;
    thetaI: number;
    phiI: number;
    thetaD: number;
    phiD: number;
    vdop: number;
    pdop: number;
    speed: number;
    lastFrameTimestamp: number;
    degree: number;
    degreeMag: number;
    ehpe: number;
    ehve: number;
    c_n0: number;
    nbSatellites: number;
    channels: Channel[];
    gpsPlugged: number;
    ephemerisStatus: number;
    vxTraj: number;
    vyTraj: number;
    firmwareStatus: number;
}

export interface Undefined {
}

export interface RootObject {
    header: number;
    droneState: DroneState;
    sequenceNumber: number;
    visionFlag: number;
    demo: Demo;
    time: number;
    rawMeasures: RawMeasures;
    physMeasures: PhysMeasures;
    gyrosOffsets: GyrosOffsets;
    eulerAngles: EulerAngles;
    references: References;
    trims: Trims;
    rcReferences: RcReferences;
    pwm: Pwm;
    altitude: Altitude;
    visionRaw: VisionRaw;
    visionOf: VisionOf;
    vision: Vision;
    visionPerf: VisionPerf;
    trackersSend: TrackersSend;
    visionDetect: VisionDetect;
    watchdog: number;
    adcDataFrame: AdcDataFrame;
    videoStream: VideoStream;
    games: Games;
    pressureRaw: PressureRaw;
    magneto: Magneto;
    windSpeed: WindSpeed;
    kalmanPressure: KalmanPressure;
    hdvideoStream: HdvideoStream;
    wifi: Wifi;
    gps: Gps;
}