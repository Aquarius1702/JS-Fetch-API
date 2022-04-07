<?php

    include "connect_db.php";

    $PostData = file_get_contents('php://input');
    $PostJSON = json_decode($PostData);

    $SQL = $PostJSON->SQLCommand.' ';

    switch ($PostJSON->SQLCommand) {

        case "SELECT":

            foreach ($PostJSON->QueryFields as $field) { $SQL = $SQL.$field.', '; }

            $SQL = rtrim($SQL, ", ").' FROM '.$PostJSON->TableName.' WHERE ';

            foreach($PostJSON->FilterFields as $filter) { $SQL = $SQL.$filter.' = ? AND '; }

            $SQL = rtrim($SQL, " AND ");

            $stmt = $pdo->prepare($SQL);
            $stmt->execute($PostJSON->FilterValues);

            echo json_encode($stmt->fetchAll());        

            // echo '{"SQL": "'.$SQL.'" }';

            break;

        case "INSERT INTO":
            
            $SQL = $SQL.$PostJSON->TableName.' (';
            $Values = "(";

            foreach ($PostJSON->InsertFields as $field) {
                $SQL = $SQL.$field.', ';
                $Values = $Values."?, ";
            }

            $Values = rtrim($Values, ", ").')';
            $SQL = rtrim($SQL, ", ").') VALUES '.$Values;

            $stmt = $pdo->prepare($SQL);
            $stmt->execute($PostJSON->InsertValues);

            echo '{"InsertID": "'.$pdo->lastInsertId().'", "InsertedRows": "'.$stmt->rowCount().'" }';

            // echo '{"SQL": "'.$SQL.'" }';

            break;

        case "UPDATE":

            $SQL = $SQL.$PostJSON->TableName.' SET ';

            foreach($PostJSON->UpdateFields as $field) { $SQL = $SQL.$field.' = ?, '; }

            $SQL = rtrim($SQL, ", ").' WHERE ';

            foreach($PostJSON->FilterFields as $filter) { $SQL = $SQL.$filter.' = ? AND '; }

            $SQL = rtrim($SQL, " AND ");

            $stmt = $pdo->prepare($SQL);
            $stmt->execute(array_merge($PostJSON->UpdateValues, $PostJSON->FilterValues));

            echo '{"UpdatedRows": '.$stmt->rowCount().' }';

            // echo '{"SQL": "'.$SQL.'" }';

            break;

        case "DELETE":

            $SQL = $SQL.'FROM '.$PostJSON->TableName.' WHERE ';

            foreach($PostJSON->FilterFields as $filter) { $SQL = $SQL.$filter.' = ? AND '; }

            $SQL = rtrim($SQL, " AND ");

            $stmt = $pdo->prepare($SQL);
            $stmt->execute($PostJSON->FilterValues);

            echo '{"DeletedRows": '.$stmt->rowCount().' }';

            // echo '{"SQL": "'.$SQL.'" }';

            break;

        default:

            echo '{"Error": 997 }';

    }

?>