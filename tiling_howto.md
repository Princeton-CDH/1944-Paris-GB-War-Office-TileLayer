# How to make the tiles

This is the series of commands to take a preexisting GeoTiff and get tiles out of it.

Strip out the GeoTIFF metadata:

`listgeo -no_norm original.tif > original.geo`

Then copy the original.tif to a new file for color editing in Photoshop/Pixelmator, whatever. The size must remain the same.

Now copy the GeoTIFF metadata back in:

`geotifcp -g original.geo modified.tif modified_geotiff.tif`

(from: http://geotiff.maptools.org/faq.html#preserve_metadata)

Hypothetically, everything should work now to make a .vrt and, from that, the tiles:

`gdal_translate -of vrt -expand rgba modified_geotiff.tif temp.vrt`

Here, however, I was getting the error:

`Error : band 1 has no color table`

So instead, I opened the geotiff up in qgis, made sure everything looked fine, and then:

1. Right-click on the layer

1. Choose “Save As...”

1. Tick the “Create VRT” box and pick a Save as location.

1. Choose a CRS. I do fine with EPSG:3857, but EPSG:4326 works ok, too.

1. Leave everything else as is and hit “OK”

A new folder should show up with a copy of the GeoTIFF inside of it as well as a .vrt file.

Finally, the tiles get made by: 

`gdal2tiles.py temp.vrt`

The folder with the tiles can then be used by leaflet.
