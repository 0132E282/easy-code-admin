<?php

namespace ND\FileManager\Services;

interface InterFileService
{
    function upload($path, $files);
    function delete($file);
    function createFolder();
    function all($path);
    function find();
    function exists();
}
