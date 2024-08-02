export default function (initFunc, options, form) {
  const elems = form.elements;

  const radius = elems['cirlces-radius'].value;
  const lenX = elems['len-circles-x'].value;
  const lenY = elems['len-circles-y'].value;

  options.circlesX = [];
  options.circlesY = [];
  options.LENX = lenX;
  options.LENY = lenY;
  options.CIRCLE_RADIUS = radius;
  options.widthBrush = elems['cirlces-width'].value;
  options.colorBrush = elems['cirlces-color'].value;

  initFunc();
}
