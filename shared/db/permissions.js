export const PRINCIPAL_ALL = 'system.Everyone';
export const PRINCIPAL_AUTHED = 'system.Authenticated';

export const TYPE_WRITE = 'write';
export const TYPE_READ = 'read';
export const TYPE_CREATE_RECORD = 'record:create';

function getPermissionsObject(permissions) {
  let permObject = {};

  if (!Array.isArray(permissions)) {
    permissions = [permissions];
  }
  permissions.forEach(perm => permObject[perm.type] = perm.principals);
  return { permissions: permObject };
}

export function lockDown() {
  return getPermissionsObject({
    type: TYPE_READ,
    principals: [],
  }, {
    type: TYPE_WRITE,
    principals: [],
  });
}


export function authedRead() {
  return getPermissionsObject({
    type: TYPE_READ,
    principals: [ PRINCIPAL_AUTHED ],
  });
}

export function authedCreate() {
  return getPermissionsObject({
    type: TYPE_CREATE_RECORD,
    principals: [ PRINCIPAL_AUTHED ],
  });
}

export function authedCreateNoRead() {
  return getPermissionsObject([{
    type: TYPE_CREATE_RECORD,
    principals: [ PRINCIPAL_AUTHED ],
  }, {
    type: TYPE_READ,
    principals: [],
  }]);
}

export function authedReadAndWrite() {
  return getPermissionsObject([{
    type: TYPE_WRITE,
    principals: [ PRINCIPAL_AUTHED ],
  }, {
    type: TYPE_READ,
    principals: [PRINCIPAL_ALL],
  }]);
}

export function authedCreateAndRead() {
  return getPermissionsObject([{
    type: TYPE_CREATE_RECORD,
    principals: [ PRINCIPAL_AUTHED ],
  }, {
    type: TYPE_READ,
    principals: [PRINCIPAL_ALL],
  }]);
}

export function authedCreateReadAndWrite() {
  return getPermissionsObject([{
    type: TYPE_CREATE_RECORD,
    principals: [ PRINCIPAL_AUTHED ],
  }, {
    type: TYPE_WRITE,
    principals: [ PRINCIPAL_AUTHED ],
  }, {
    type: TYPE_READ,
    principals: [PRINCIPAL_ALL],
  }]);

}
