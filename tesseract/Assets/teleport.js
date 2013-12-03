var targetPosition : Vector3;
var targetRotate : float = 270;
 
function OnTriggerEnter( other : Collider ) {
  other.transform.position = targetPosition;
  other.transform.Rotate(Vector3.forward, targetRotate);
   
 }