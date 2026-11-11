namespace greeting;

/**
 * GreetingService - exposes a single unbound function
 * that returns a Hello World greeting message.
 */
service GreetingService @(path: '/greeting') {

  /**
   * Returns a greeting message.
   * @param name - Optional name to personalise the greeting
   */
  function greet(name : String) returns String;

}
