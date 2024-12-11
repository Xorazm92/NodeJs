import { Controller, Delete, Param } from "@nestjs/common";


@Controller('todos')
export class TodoController{
    constructor(private readonly todosService:TodosService){}

    @Post()
    create(@Body() createTodoDto: CreateTodoDto){
        return this.todosService.create(createTodoDto);
    }

    @Get()
    findAll(){
        return this.todosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.todosService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.update(+id, updateTodoDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string) {
        return this.todosService.remove(+id);
    }
}