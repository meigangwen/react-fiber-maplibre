import Protobuf from 'pbf';
import {VectorTile} from '@mapbox/vector-tile';

function loadVectorTile(url: string): Promise<VectorTile> {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => new VectorTile(new Protobuf(buffer)));
}