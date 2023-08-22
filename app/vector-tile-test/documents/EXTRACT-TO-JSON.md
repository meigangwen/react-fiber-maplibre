# How to extract
Maplibre downloaded tile, e.g https://tileserver.yilumi.com/data/singapore/14/12914/8132.pbf, 
is essentially Mapbox's vector tile format ".mvt".

To extract to a text geojson offline, we can do:
1. On a linux machine (haven't tested on windows)
```
cd ~
mkdir -p tile-test/server/tiles
curl -o tile-test/server/tiles/14-12914-8132.mvt https://tileserver.yilumi.com/data/singapore/14/12914/8132.pbf
cd tile-test
```

2. Install vt2geojson, a command line utility which turns vector tiles into geojson, and harp, a simple file server. 
```
npm install -g vt2geojson harp
```

3. Start a static file server
```
harp server --port 9000
```

4. Read the contents of an entire vector tile

```
vt2geojson -z 14 -y 12914 -x 8132 http://localhost:9000/tiles/14-12914-8132.mvt > 14-12914-8132.mvt.json
```

5. Read the contents of a particular layer in a vector tile

```
vt2geojson --layer building -z 14 -y 12914 -x 8132 http://localhost:9000/tiles/14-12914-8132.mvt > 14-12914-8132.mvt.building.json
```