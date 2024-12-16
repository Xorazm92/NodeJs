function LogMethod() {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        console.log(`Metod ${propertyKey} chaqirildi`);
        return originalMethod.apply(this, args);
      };
      return descriptor;
    };
  }
  
  class UserService {
    @LogMethod()
    createUser(name: string) {
      console.log(`Foydalanuvchi ${name} yaratilmoqda`);
    }
  }
//   _______________________

function Uppercase() {
    return function (target: any, propertyKey: string) {
      let value = target[propertyKey];
  
      const getter = function() {
        return value;
      };
  
      const setter = function(newVal: string) {
        value = newVal.toUpperCase();
      };
  
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    };
  }
  
  class User {
    @Uppercase()
    name: string;
  }
//   ______________________

function Validate() {
    return function (
      target: any,
      propertyKey: string,
      parameterIndex: number
    ) {
      target.validators = {
        [propertyKey]: {
          [parameterIndex]: (value: any) => value !== null && value !== undefined
        }
      };
    };
  }
  
  class AuthService {
    login(@Validate() username: string, @Validate() password: string) {
      
    }
  }

//   ______________________

function Injectable(options?: any) {
    return function(target: any) {
      target.prototype.options = options;
      return target;
    };
  }
  
  @Injectable({ scope: 'request' })
  class AuthController {
   
  }

//   ____________________
function logMethod(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
      console.log(`Metod ${key} chaqirildi`);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  }
  
  class UserService {
    logMethod
    createUser(name) {
      console.log(`Foydalanuvchi ${name} yaratilmoqda`);
    }
  }

//   ______________________


function readonly(target, key, descriptor) {
    descriptor.writable = false;
    return descriptor;
  }
  
  class Config {
    @readonly
    apiKey = 'secret-key';
  }

//   __________________

function required(target, key, index) {
    if (!target.validators) {
      target.validators = {};
    }
    target.validators[key] = {
      [index]: (value) => value !== null && value !== undefined
    };
  }
  
  class UserService {
    createUser(@required name, @required email) {
      
    }
  }

//   ________________________

function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
  }
  
  @sealed
  class BaseService {
 
  }