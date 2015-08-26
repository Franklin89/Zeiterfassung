#region (C) ML-Software.ch, Zollikofen, Switzerland 2015
//  Filename:  User.cs
//  Date: 26/08/2015
//  Author:  Matteo Locher
//  CONTENS:
//  DESCRIPTION: 
//  ----------------------------------------------------------------------------
//  Copyright (c) 2015. This software is subject to copyright protection under
//  the laws of Switzerland, European Union and other countries. This software is
//  the private properties of ML-Software.ch, Zollikofen, Switzerland and can not be
//  reproduced, distributed or given to a third party without the written consent
//  of ML-Software.ch.
#endregion

using System.Collections.Generic;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public double WorkingHoursPerDay { get; set; }

        public virtual List<Project> Projects { get; set; }

        public virtual List<UserTask> UserTasks { get; set; }
    }
}