export type animationSettings = {
  totalFrames: number,
  animationDirection: -1 | 1,
  state: number,
}

export type orientationSettings = {
  totalCycleAngle: number, // 360
  periodAngle: number,
  state: number,
}

export type orientedSpriteImageSettings = {
  pxWidth: number,
  pxHeight: number,
  image: HTMLImageElement,

  imageSizeX: number;
  imageSizeY: number;

  animationSettings: animationSettings,
  orientationSettings: orientationSettings,
}