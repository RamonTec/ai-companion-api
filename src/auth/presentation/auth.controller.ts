
/**
 * things that i must to do:
 * 1... define and endpoint to receive and return back responso to create an user
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    register() {

    }
}