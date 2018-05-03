from boa.interop.Neo.Storage import Get,Put,Delete,GetContext

def Main(addr1,addr2,addr3):
    ctx = GetContext()

    Put(ctx, addr1, 200)
    Put(ctx, addr2, 300)
    Put(ctx, addr3, 500)
    print("Transaction run")
    return True