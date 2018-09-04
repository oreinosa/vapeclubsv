<?php

class AdminGuardMiddleware {
  public function __invoke($request, $response, $next){
    $token = $request->getAttribute("token");
    // return $response->withBody(var_dump($token));
    if($token && isset($token->id_role) && $token->id_role == "3"){
      $response = $next($request, $response);
      return $response;
    } else{
      return $response->write('Not Authorized')->withStatus(401);
    }
  }
}