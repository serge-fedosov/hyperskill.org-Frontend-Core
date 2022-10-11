async function findUserById(id) {
  return new Promise((resolve, reject) => {
    if (users[id]) {
      setTimeout(() => resolve(users[id]), 1000);
    }
      setTimeout(() => reject('No user with this id'), 1000);
  });
}

async function handleResult(number) {
  try {
    const resultOfThePromise = await findUserById(number);
    console.log(resultOfThePromise);
  } catch(err) {
    console.log(err); // Sorry! Only Google is allowed.
  }
}