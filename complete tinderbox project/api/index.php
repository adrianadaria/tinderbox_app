<?php
        
require 'vendor/autoload.php';
     
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

$app = new \Slim\App();

$app->get('/', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    echo <<<OUTPUT
    
    <html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <title>Rest API</title>
    </head>
    <body>
        <h2>TinderBox API Interface Beta Version</h2>
        <div id="content">
            <select id="req">
                <option value="get">get</option>
                <option value="post">post</option>
            </select>
            <select id="ex">
                <option value="und">select</option>
                <option value="news">news</option>
                <option value="task">task</option>
                <option value="team">team</option>
                <option value="ticket">ticket</option>
                <option value="faq">faq</option>
                <option value="user">user</option>
            </select>
            <button id="go" type="button" style="margin-bottom: 2%">get</button>
        </div>
        <iframe id="out" src="" style="width:65%;margin-top:5px"></iframe>
        <script>
            $(document).ready(function(){
            
            $("#ex").change(function () {
                var req = $("#req").val();
                var ex = $("#ex").val();
                if (req == 'post' && ex == 'news') {
                    $("#go").hide();
                    $("#out").hide();
                    var form = '<form action="http://kostylo.dk/projects/api/createNews" method="post"><input type="text" name="aut" placeholder="author"><input type="text" name="tit" placeholder="title"><input type="text" name="des" placeholder="description"><input type="text" name="pic" placeholder="picture"><input type="submit" value="insert"></form>';
                $("#content").append(form);
                } else if (req == 'post' && ex == 'task') {
                    $("#go").hide();
                    $("#out").hide();
                    var form = '<form action="http://kostylo.dk/projects/api/createTask" method="post"><input type="text" name="tit" placeholder="title"><input type="text" name="des" placeholder="description"><input type="text" name="start" placeholder="start date time"><input type="text" name="end" placeholder="end date time"><input type="text" name="aid" placeholder="area id"><input type="text" name="vid" placeholder="volunteer id"><input type="text" name="lid" placeholder="leader id"><input type="submit" value="insert"></form>';
                $("#content").append(form);
                } else if (req == 'post' && ex == 'team') {
                    $("#go").hide();
                    $("#out").hide();
                    var form = '<form action="http://kostylo.dk/projects/api/createTeam" method="post"><input type="text" name="name" placeholder="team name"><input type="text" name="lid" placeholder="leader id"><input type="submit" value="insert"></form>';
                $("#content").append(form);
                } else if (req == 'post' && ex == 'ticket') {
                    $("#go").hide();
                    $("#out").hide();
                    var form = '<form action="http://kostylo.dk/projects/api/createTicket" method="post"><input type="text" name="type" placeholder="type"><input type="text" name="qr" placeholder="qr"><input type="submit" value="insert"></form>';
                $("#content").append(form);
                } else if (req == 'post' && ex == 'faq') {
                    $("#go").hide();
                    $("#out").hide();
                    var form = '<form action="http://kostylo.dk/projects/api/createFaq" method="post"><input type="text" name="quest" placeholder="question"><input type="text" name="answer" placeholder="answer"><input type="submit" value="insert"></form>';
                $("#content").append(form);
                } else if (req == 'post' && ex == 'user') {
                    $("#go").hide();
                    $("#out").hide();
                    var form = '<form action="http://kostylo.dk/projects/api/createUser" method="post"><input type="text" name="userName" placeholder="fullname"><input type="text" name="userPass" placeholder="pass"><input type="text" name="phone" placeholder="phone"><input type="text" name="email" placeholder="email"><input type="submit" value="insert"></form>';
                $("#content").append(form);
                }
                
            }).change();
            
                $("#go").click(function(){
                
                    var req = $("#req").val();
                    var ex = $("#ex").val();
                    var iframe = $("#out");
                    
                    if (req == 'get' && ex == 'news') {
                        var url = "http://kostylo.dk/projects/api/news";
                        iframe.attr('src',url);
                    }else if (req == 'get' && ex == 'task') {
                        var url = "http://kostylo.dk/projects/api/task";
                        iframe.attr('src',url);
                    }else if (req == 'get' && ex == 'team') {
                        var url = "http://kostylo.dk/projects/api/teams";
                        iframe.attr('src',url);
                    }else if (req == 'get' && ex == 'ticket') {
                        var url = "http://kostylo.dk/projects/api/tickets";
                        iframe.attr('src',url);
                    }else if (req == 'get' && ex == 'faq') {
                        var url = "http://kostylo.dk/projects/api/faq";
                        iframe.attr('src',url);
                    }
                    
                 });
            });
        </script>
    </body>
    </html>
   
OUTPUT;

    return $response->withStatus(200);
});

$app->post('/login', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    $uname = $request->getParam('uname');
    $upass = $request->getParam('upass');
    
    try {
    
        $loginStatus = login($uname, $upass);
    
        if ($loginStatus != null) {
        
            $uid = (int) $loginStatus->{'vid'};
            $teamId = (int) $loginStatus->{'tid'};

            $tokid = "1236547";
            $secretKey = '123456789';

            $tokenId    = base64_encode($tokid);
            $issuedAt   = time();
            $notBefore  = $issuedAt + 10;             //Adding 10 seconds
            $expire     = $notBefore + 300;            // Adding 60 seconds
            $serverName = 'http://kostylo.dk';        // Issuer
    
            $token = [
                'iat'  => $issuedAt,                // Issued at: time when the token was generated
                'jti'  => $tokenId,                 // Json Token Id: an unique identifier for the token
                'iss'  => $serverName,              // Issuer
                'nbf'  => $notBefore,               // Not before
                'exp'  => $expire,                  // Expire
                'data' => [                         // Data related to the signer user
                    'userId'   => $uid,             // userid from the users table
                    'userName' => $uname,           // User name
                    'tid' => $teamId
                ]
            ];
        
            return $response->withHeader('Content-Type', 'application/json')->withJson($token, 200);
        }
    
    }   catch(PDOException $e) {
        
            return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
        }
});

$app->get('/news', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        $data = getAll('news');
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/task', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        $data = getAll('task');
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/teams', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        $data = getAll('team');
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/area', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        $data = getAll('area');
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/tickets', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        $data = getAll('ticket');
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/faq', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        $data = getAll('faq');
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/messages', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        $data = getAll('systemMessage');
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/members', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        //$data =  array();
        $data = getTeamMembers();
        //echo $data['phone'];
        //print_r($data);
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/tasks', function (ServerRequestInterface $request, ResponseInterface $response) {
    
    try {
        //$data =  array();
        $data = getTasks();
        //echo $data['phone'];
        //print_r($data);
        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }

});

$app->get('/vol/{id}', function (ServerRequestInterface $request, ResponseInterface $response) {
    
   try
    {
        $id = $request->getAttribute('id');
        $data = getRowById('vol', 'vid', $id);

        return $response->withHeader('Content-Type', 'application/json')->withJson($data, 200);

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }
});


$app->post('/createUser', function (ServerRequestInterface $request, ResponseInterface $response) {
    $userName = $request->getParam('userName');
    $userPass = $request->getParam('userPass');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    
     try {

        if ($userName != "" && $userPass != "" && $phone != "" && $email != "") {
            $data = createUser($userName, $userPass, $phone, $email);
            if ($data == true) {
                $status = array("status" => "success", "code" => 1);
                return $response->withHeader('Content-Type', 'application/json')->withJson($status, 200);
            }
        } 

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }
});

$app->post('/createNews', function (ServerRequestInterface $request, ResponseInterface $response) {
    $aut = $request->getParam('aut');
    $tit = $request->getParam('tit');
    $des = $request->getParam('des');
    $pic = $request->getParam('pic');
    
     try {

        if ($aut != "" && $tit != "" && $des != "" && $pic != "") {
            $data = createNews($aut, $tit, $des, $pic);
            if ($data == true) {
                $status = array("status" => "success", "code" => 1);
                return $response->withHeader('Content-Type', 'application/json')->withJson($status, 200);
            }
        } 

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }
});

$app->post('/createTask', function (ServerRequestInterface $request, ResponseInterface $response) {
    $tit = $request->getParam('tit');
    $des = $request->getParam('des');
    $start = $request->getParam('start');
    $end = $request->getParam('end');
    $aid = $request->getParam('aid');
    $vid = $request->getParam('vid');
    $lid = $request->getParam('lid');
    
     try {

        if ($tit != "" && $des != "" && $start != "" && $end != "" && $aid != "" && $vid != "" && $lid != "") {
            $data = createTask($tit, $des, $start, $end, $aid, $vid, $lid);
            if ($data == true) {
                $status = array("status" => "success", "code" => 1);
                return $response->withHeader('Content-Type', 'application/json')->withJson($status, 200);
            }
        } 

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }
});

$app->post('/createTeam', function (ServerRequestInterface $request, ResponseInterface $response) {
    $name = $request->getParam('name');
    $lid = $request->getParam('lid');
    
     try {

        if ($name != "" && $lid != "") {
            $data = createTeam($name, $lid);
            if ($data == true) {
                $status = array("status" => "success", "code" => 1);
                return $response->withHeader('Content-Type', 'application/json')->withJson($status, 200);
            }
        } 

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }
});

$app->post('/createTicket', function (ServerRequestInterface $request, ResponseInterface $response) {
    $type = $request->getParam('type');
    $qr = $request->getParam('qr');
    
     try {

        if ($type != "" && $qr != "") {
            $data = createTicket($type, $qr);
            if ($data == true) {
                $status = array("status" => "success", "code" => 1);
                return $response->withHeader('Content-Type', 'application/json')->withJson($status, 200);
            }
        } 

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }
});

$app->post('/createFaq', function (ServerRequestInterface $request, ResponseInterface $response) {
    $q = $request->getParam('quest');
    $a = $request->getParam('answer');
    
     try {

        if ($q != "" && $a != "") {
            $data = createFaq($q, $a);
            if ($data == true) {
                $status = array("status" => "success", "code" => 1);
                return $response->withHeader('Content-Type', 'application/json')->withJson($status, 200);
            }
        } 

    } catch(PDOException $e) {
        return $response->withStatus(404)->write('{"error":{"text":'. $e->getMessage() .'}}');
    }
});
        
$app->run();

function getDB() {
    $dbhost = "kostylo.dk.mysql:3306";
    $dbuser = "kostylo_dk";
    $dbpass = "admin123";
    $dbname = "kostylo_dk";

    $mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

function login($uname, $upass) {

    try
    {
        $db = getDB();
        $sth = $db->prepare("SELECT * FROM vol WHERE vname = :uname AND pass = :pass");
        $sth->bindParam(':uname', $uname, PDO::PARAM_STR);
        $sth->bindParam(':pass', $upass, PDO::PARAM_STR);
        $sth->execute();

        $user = $sth->fetch(PDO::FETCH_OBJ);

        if($user) {
            return $user;
        } else {
            throw new PDOException('No records found');
        }

        $db = null;
    } catch(PDOException $e) {
        throw new PDOException('Wrong username or password');
    }
}

function getAll($table){

    try
    {
        $db = getDB();
        $sth = $db->prepare("SELECT * FROM $table");
        $sth->execute();

        $users = $sth->fetchAll(PDO::FETCH_OBJ);

        if($users) {
           return $users;
        } else {
            throw new PDOException('No records found.');
        }

        $db = null;
    } catch(PDOException $e) {
        throw new PDOException('No records found.');
    }
}

function getRowById($table, $column, $id){

    try
    {
        $db = getDB();
        $sth = $db->prepare("SELECT * FROM $table WHERE $column = :id");
        $sth->bindParam(':id', $id, PDO::PARAM_INT);
        $sth->execute();

        $user = $sth->fetch(PDO::FETCH_OBJ);

        if($user) {
            return $user;
        } else {
            return null;
        }

        $db = null;
    } catch(PDOException $e) {
        throw new PDOException('No records found.');
    }
}

function createUser($fullName, $pass, $phone, $email) {
    
   try
    {
        $db = getDB();

        $sql = "INSERT INTO vol (vname, pass, phone, email, vstatus, tid, tkid) VALUES 
                (:fullName, :pass, :phone, :email, 'inactive', null, null)";
        $sth = $db->prepare($sql);

        $sth->bindParam(':fullName', $fullName, PDO::PARAM_STR);
        $sth->bindParam(':pass', $pass, PDO::PARAM_STR);
        $sth->bindParam(':phone', $phone, PDO::PARAM_INT);
        $sth->bindParam(':email', $email, PDO::PARAM_STR);

        $sth->execute();

        $db = null;

        return true;
    } catch(PDOException $e) {
        throw new PDOException('attributes not right.');
    }
}

function createNews($author, $title, $des, $pic) {
    
   try
    {
        $db = getDB();

        $sql = "INSERT INTO news (author, title, description, picture) VALUES 
                (:author, :title, :des, :pic)";
        $sth = $db->prepare($sql);

        $sth->bindParam(':author', $author, PDO::PARAM_STR);
        $sth->bindParam(':title', $title, PDO::PARAM_STR);
        $sth->bindParam(':des', $des, PDO::PARAM_INT);
        $sth->bindParam(':pic', $pic, PDO::PARAM_STR);

        $sth->execute();

        $db = null;

        return true;
    } catch(PDOException $e) {
        throw new PDOException('attributes not right.');
    }
}

function createTask($title, $des, $start, $end, $aid, $vid, $lid) {
    
   try
    {
        $db = getDB();

        $sql = "INSERT INTO task (title, description, tstart, tend, aid, vid, lid) VALUES 
                (:title, :des, :start, :end, :aid, :vid, :lid)";
        $sth = $db->prepare($sql);

        $sth->bindParam(':title', $title, PDO::PARAM_STR);
        $sth->bindParam(':des', $des, PDO::PARAM_STR);
        $sth->bindParam(':start', $start, PDO::PARAM_STR);
        $sth->bindParam(':end', $end, PDO::PARAM_STR);
        $sth->bindParam(':aid', $start, PDO::PARAM_INT);
        $sth->bindParam(':vid', $start, PDO::PARAM_INT);
        $sth->bindParam(':lid', $start, PDO::PARAM_INT);

        $sth->execute();

        $db = null;

        return true;
    } catch(PDOException $e) {
        throw new PDOException('attributes not right.');
    }
}

function createTeam($name, $lid) {
    
   try
    {
        $db = getDB();

        $sql = "INSERT INTO team (tname, lid) VALUES 
                (:name, :lid)";
        $sth = $db->prepare($sql);

        $sth->bindParam(':name', $name, PDO::PARAM_STR);
        $sth->bindParam(':lid', $lid, PDO::PARAM_INT);

        $sth->execute();

        $db = null;

        return true;
    } catch(PDOException $e) {
        throw new PDOException('attributes not right.');
    }
}

function createTicket($type, $qr) {
    
   try
    {
        $db = getDB();

        $sql = "INSERT INTO ticket (ttype, qr) VALUES 
                (:type, :qr)";
        $sth = $db->prepare($sql);

        $sth->bindParam(':type', $type, PDO::PARAM_STR);
        $sth->bindParam(':qr', $qr, PDO::PARAM_INT);

        $sth->execute();

        $db = null;

        return true;
    } catch(PDOException $e) {
        throw new PDOException('attributes not right.');
    }
}

function createFaq($q, $a) {
    
   try
    {
        $db = getDB();

        $sql = "INSERT INTO faq (question, answer) VALUES 
                (:q, :a)";
        $sth = $db->prepare($sql);

        $sth->bindParam(':q', $q, PDO::PARAM_STR);
        $sth->bindParam(':a', $a, PDO::PARAM_STR);

        $sth->execute();

        $db = null;

        return true;
    } catch(PDOException $e) {
        throw new PDOException('attributes not right.');
    }
}

function getTeamMembers() {

    try 
    
    {
        $db = getDB();
        $sql = 'select v.vid, v.vname, v.email, v.phone, v.tid, t.tname, t.lid, l.lname from vol v join team t on v.tid = t.tid join leader l on t.lid = l.lid';
        $sth = $db->prepare($sql);
        $sth->execute();
        $statement = $st;

        $members = $sth->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        return $members;
        
    } catch(PDOException $e) {
        throw new PDOException('Something Wrong with SQL statement or ST parameter.');
    }
}

function getTasks() {

    try 
    
    {
        $db = getDB();
        $sql = "SELECT task.title, vol.vid, vol.vname, area.aname, DATE_FORMAT(task.tstart,'%d-%m-%Y') as tdate, DATE_FORMAT(task.tstart,'%h:%i') as startd, DATE_FORMAT(task.tend,'%h:%i') as endd, TIMESTAMPDIFF(MINUTE, task.tstart,task.tend) as duration, leader.lname, leader.email, leader.phone FROM task 
        INNER JOIN vol ON vol.vid = task.vid INNER JOIN leader ON leader.lid = task.lid INNER JOIN area ON task.aid = area.aid";
        $sth = $db->prepare($sql);
        $sth->execute();
        
        $data = $sth->fetchAll(PDO::FETCH_OBJ);
        
        if ($data) {
             return $data;
        } 

        $db = null;
    } catch(PDOException $e) {
        throw new PDOException('Something Wrong with SQL statement or ST parameter.');
    }
}