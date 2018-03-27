import Tileset from "./Tileset";
import DataList from "../../../structures/List";

export default function ParseTilesets(json, cache) {

    let size = json.tilesets.length || -1;

    if (size <= 0)
        return null;

    let tilesets = new DataList();

    for (let i = 0; i < size; i++) {

        let tileset = json.tilesets[i];

        if (tileset.image) {

            var newTileSet = new Tileset(
                tileset.name, 
                tileset.firstgid, 
                tileset.tilewidth, 
                tileset.tileheight, 
                tileset.margin, 
                tileset.spacing);

            newTileSet.image = cache.getAsset('image', tileset.name);

            newTileSet.updateData(tileset.imagewidth, tileset.imageheight);

            tilesets.push(newTileSet);
        }
    }

    return tilesets;

}