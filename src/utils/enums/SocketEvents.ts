export enum SocketEvents {
  // Emit from client event
  START_ATTACK = "START_ATTACK",
  STOP_ATTACK = "STOP_ATTACK",
  ADD_ATTACK_OPTION_AND_CONTINUE = "ADD_ATTACK_OPTION_AND_CONTINUE",
  UPDATE_ATTACK_OPTION = "UPDATE_ATTACK_OPTION",

  // Emit from server event
  PREPARE_DATA = "PREPARE_DATA",
  PREPARE_DATA_FAILED = "PREPARE_DATA_FAILED",
  PREPARE_DATA_SUCCESS = "PREPARE_DATA_SUCCESS",
  SCANING = "SCANING",
  SCAN_FAILED = "SCAN_FAILED",
  SCAN_SUCCESS = "SCAN_SUCCESS",
  SCAN_SUCCESS_ALL = "SCAN_SUCCESS_ALL",
  TRAINING = "TRAINING",
  TRAINING_SUCCESS = "TRAINING_SUCCESS",
  TRAINING_FAILED = "TRAINING_FAILED",
  ATTACKING = "ATTACKING",
  ATTACK_STATE_CHANGE = "ATTACK_STATE_CHANGE",
  ATTACK_FAILED = "ATTACK_FAILED",
  ATTACKING_SUCCESS = "ATTACKING_SUCCESS",
  GOT_SHELL = "GOT_SHELL",
  GOT_METERPRETER = "GOT_METERPRETER",
  ADD_DETAIL = "ADD_DETAIL",
  SEND_COMMAND = "SEND_COMMAND",
  SEND_COMMAND_SUCCESS = "SEND_COMMAND_SUCCESS",
  SEND_COMMAND_FAILED = "SEND_COMMAND_FAILED",
  RECEIVED_RESPONSE = "SEND_RESPONSE",
  ADD_ATTACK_OPTION = "ADD_ATTACK_OPTION",
}
