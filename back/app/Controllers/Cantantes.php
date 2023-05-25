<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Cantantes extends ResourceController
{
    protected $modelName = 'App\Models\CantantesModel';
    protected $format    = 'json';

    public function __construct($config = 'rest')
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    }

    public function index()
    {
        return $this->genericResponse($this->model->findAll(), "", 200);
    }

    public function show($id = null)
    {

        if ($id == null) {
            return $this->genericResponse(null, "Requerido id en la solicitud", 500);
        }

        $cantante = $this->model->find($id);

        if (!$cantante) {
            return $this->genericResponse(null, "El cantante solicitado no fue encontrado", 204);
        } else {
            return $this->genericResponse($cantante, "", 200);
        }
    }

    public function create()
    {



        $cantante = new $this->model;

        $id = $cantante->insert([
            'nombre'     => $this->request->getPost('nombre'),
            'apellido'   => $this->request->getPost('apellido'),
            'nacimiento' => $this->request->getPost('nacimiento'),
            'Biografia'  => $this->request->getPost('Biografia'),
        ]);

        if ($id) {
            return $this->genericResponse($this->model->find($id), "El cantante fue creado con exito", 200);
        } else {

            $validation = \config\Services::validation();

            return $this->genericResponse(null, $validation->getErrors, 500);
        }
    }

    public function update($id = null)
    {

        $cantanteDB = $this->model->find($id);

        if (!$cantanteDB) {
            return $this->genericResponse(null, "El cantante solicitado no fue encontrado", 500);
        }

        $cantante = new $this->model;

        $data = $this->request->getRawInput();

        $cantante->update($id, [
            'nombre'     => $data['nombre'],
            'apellido'   => $data['apellido'],
            'nacimiento' => $data['nacimiento'],
            'Biografia'  => $data['Biografia'],
        ]);

        if ($id) {
            return $this->genericResponse($this->model->find($id), "El cantante fue creado con exito", 200);
        } else {

            $validation = \config\Services::validation();

            return $this->genericResponse(null, $validation->getErrors, 500);
        }
    }

    private function genericResponse($data, $msj, $code)
    {

        if ($code == 200) {
            return $this->respond(array(
                "data" => $data,
                "code" => $code
            ));
        } else {
            return $this->respond(array(
                "mjs" => $msj,
                "code" => $code
            ));
        }
    }

    public function delete($id = null)
    {

        $cantante = $this->model->delete($id);

        if ($cantante) {
            return $this->genericResponse($cantante, "Cantante eliminado con exito", 200);
        } else {
            return $this->genericResponse(null, "Error eliminado con exito", 200);
        }
    }
}
